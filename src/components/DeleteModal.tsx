import './DeleteModal.css';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

// propsの型
type PropsType = {
  deleteShowFlag: boolean;
  setDeleteShowModal: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<DataType[]>>;
  data: DataType[];
  id: number | undefined; 
  title: string | undefined; 
}

// Dataの型
type DataType = {
  id: number;
  title: string;
  partner: string;
  description: string;
  dueDate: Date;
  status: boolean;
  createdAt: EpochTimeStamp;
  due_date: Date;
  created_at: EpochTimeStamp;
}

export const DeleteModal = (props: PropsType) => {
  // 削除処理
  const handleDelete = (id: number, title: string): void => {
    const dataToSend = { id, title };
    // サーバーへリクエスト送信
    axios.post('http://localhost:3000/delete', dataToSend)
      .then(response => {
        console.log('Data created:', response.data);
        props.setData((prevData) => prevData.filter((item) => item.id !== id)); // setDataを更新
      })
      .catch(error => {
        console.error('Error creating data:', error);
      });

    props.setDeleteShowModal(false); // Modalを閉じる
  }

  return (
    <>
      {props.deleteShowFlag ? (
        <div className="overlay">
          <div className="deleteModal">
            <div className="deleteModalHeader"></div>
            <div className="deleteModalBody">
              <div className="deleteModalTitle">削除してもよろしいですか？</div>
              <div className="deleteModalContent">タイトル：{props.title}</div>
              <hr />
              <div className="deleteModalButtonForm">
                <button 
                  className="deleteModalOK" 
                  onClick={() => {
                    if (props.id !== undefined && props.title !== undefined) {handleDelete(props.id, props.title)}
                  }}
                >
                  OK
                </button>
                <button className="deleteModalCancel" onClick={() => props.setDeleteShowModal(false)}>キャンセル</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
