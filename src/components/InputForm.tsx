import './InputForm.css';
import { useNavigate } from "react-router-dom";
import startPage from "../icon/startPage.png";
import backPage from "../icon/backPage.png";
import nextPage from "../icon/nextPage.png";
import lastPage from "../icon/lastPage.png";

export const InputForm = () => {
    const navigate = useNavigate();
  return (
    <div className="inputForm">
        <form className="inputItmes">
            <table className="itemsTable">
                <tr>
                    <td>
                        <span className="itemName">タイトル：</span>
                        <input type="text" className="titleForm" />
                    </td>
                    <td>
                        <span className="itemName">取引先：</span>
                        <input type="text" className="partnerForm" />
                    </td>
                    <td>
                        <span className="itemName">期限：</span>
                        <input type="date" className="dueDateForm" />
                    </td>                
                </tr>
                <tr>
                    <td colSpan={3}>
                        <span className="itemName">&#12288;&#12288;詳細：</span>
                        <input type="text" className="descriptionForm" />
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <div className="buttonForm">
                            <div className="leftButton"></div>
                            <button className="inputButton">入力</button>
                            <button className="switchingButton" onClick={() => {navigate("/SearchForm");}}>検索画面へ</button>
                        </div>
                    </td>
                </tr>
            </table>
        </form>
        <hr />
        <div className="pageNation">
            <img src={startPage} className="pageNationButton" />
            <img src={backPage} className="pageNationButton" />
            <span className="pageNationButton">1</span>
            <img src={nextPage} className="pageNationButton" />
            <img src={lastPage} className="pageNationButton"  />
        </div>
    </div>
  )
}
