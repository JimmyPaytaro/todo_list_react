import './DeleteModal.css';
import axios from 'axios';

export const DeleteModal = (props: any) => {
  // 削除処理
  const handleDelete = (id: number, title: string): void => {
    const dataToSend = { id, title };
    // サーバーへリクエスト送信
    axios.post('http://localhost:3000/delete', dataToSend)
      .then(response => {
        console.log('Data created:', response.data);
        props.setData((prevData: { id: number, title: string }[]) => prevData.filter((item: any) => item.id !== id)); // setDataを更新
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
              <div className="deleteModalTitle">以下の内容を削除してもよろしいでしょうか？</div>
              <div className="deleteModalContent">タイトル：{props.title}</div>
              <hr />
              <div className="deleteModalButtonForm">
                <button className="deleteModalOK" onClick={() => handleDelete(props.id, props.title)}>OK</button>
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
