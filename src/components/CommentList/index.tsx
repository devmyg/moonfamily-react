import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  ButtonProps,
  Form,
  Input,
  List,
  Modal,
  Popconfirm,
  Space,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { deleteComment, getComment, updateComment, writeComment } from "../../apis";
import "./style.css";

const { Text } = Typography;

interface User {
  userId: string;
  userName: string;
  userProfile: string;
}

interface Comment {
  commentId: number;
  commentContent: string;
  commentWriteDate: string;
  user: User;
}

type CommentListProps = {
  boardNumber: number;
};

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}

const CommentList = ({ boardNumber }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cookies] = useCookies();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentId, setCommentId] = useState<number | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getComment(boardNumber);
      if (data.data) setComments(data.data);
      setLoading(false);
    };
    fetchData();
  }, [boardNumber]);

  useEffect(() => {
    if (!isModalOpen) {
      form2.resetFields();
    }
  }, [isModalOpen, form2]);

  const onFinish = async (values: any) => {
    const token = cookies.token;
    values.boardNumber = boardNumber;
    const writeResponse = await writeComment(values, token);
    if (!writeResponse || !writeResponse.result) {
      message.error(writeResponse.message);
      return;
    }
    message.success("댓글이 작성되었습니다.");
    setLoading(true);
    const data = await getComment(boardNumber);
    if (data) {
      setComments(data.data);
      form.resetFields();
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = async (commentId: number, commentContent: string) => {
    form2.setFieldsValue({ commentContent });
    setIsModalOpen(true);
    setCommentId(commentId);
  };

  const handleOk = async () => {
    if (!form2 || !commentId) return;
    const token = cookies.token;
    const updateResponse = await updateComment(
      commentId,
      form2.getFieldValue("commentContent"),
      token
    );
    if (!updateResponse || !updateResponse.result) {
      message.error("댓글 수정에 실패했습니다.");
      return;
    }
    message.success("댓글이 수정되었습니다.");
    setLoading(true);
    const data = await getComment(boardNumber);
    if (data) {
      setComments(data.data);
    }
    setLoading(false);
    setIsModalOpen(false);
    setCommentId(undefined);
  };

  const handleDelete = async (commentId: number) => {
    const token = cookies.token;
    const deleteResponse = await deleteComment(commentId, token);
    if (!deleteResponse || !deleteResponse.result) {
      message.error(deleteResponse.message);
      return;
    }
    message.success("댓글이 삭제되었습니다.");
    setLoading(true);
    const data = await getComment(boardNumber);
    if (data) {
      setComments(data.data);
      form.resetFields();
    }
    setLoading(false);
  };

  const IconButton = ({ icon, ...rest }: IconButtonProps) => <Button {...rest} icon={icon} />;

  return (
    <div>
      <List
        className="comment-list"
        header={<div>댓글 {comments.length}개</div>}
        loading={loading}
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item
            style={{ paddingTop: 0 }}
            actions={[
              comment.user && comment.user.userId === cookies.user.userId && (
                <Space key="comment-actions">
                  <IconButton
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(comment.commentId, comment.commentContent)}
                  />
                  <Popconfirm
                    title="정말로 삭제하시겠습니까?"
                    onConfirm={() => handleDelete(comment.commentId)}
                    okText="삭제"
                    cancelText="취소"
                  >
                    <IconButton icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              ),
            ]}
          >
            <List.Item.Meta
              avatar={
                comment.user && comment.user.userProfile ? (
                  <Avatar
                    src={`https://moonfamily.kro.kr/${comment.user.userProfile}`}
                    style={{ marginTop: "20px" }}
                  />
                ) : (
                  <Avatar
                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    style={{ marginTop: "20px" }}
                  />
                )
              }
              title={
                <>
                  <Space size={8}>
                    <Text strong>{comment.user && comment.user.userName}</Text>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      {comment.commentWriteDate}
                    </Text>
                  </Space>
                </>
              }
              description={<div>{comment.commentContent}</div>}
            />
          </List.Item>
        )}
      />
      <CommentForm form={form} onFinish={onFinish} />
      <Modal
        forceRender
        title="댓글 수정"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form2}>
          <Form.Item
            name="commentContent"
            rules={[{ required: true, message: "댓글을 입력하세요." }]}
          >
            <Input.TextArea rows={4} placeholder="댓글을 입력하세요." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

type CommentFormProps = {
  form: any;
  onFinish: (values: any) => void;
};

const CommentForm = ({ form, onFinish }: CommentFormProps) => {
  return (
    <Form form={form} onFinish={onFinish} className="comment-form">
      <Form.Item name="commentContent" rules={[{ required: true, message: "댓글을 입력하세요." }]}>
        <Input.TextArea placeholder="댓글을 입력하세요." rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          댓글 작성
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentList;
