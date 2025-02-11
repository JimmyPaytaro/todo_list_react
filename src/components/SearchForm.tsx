import { useNavigate } from 'react-router-dom';
import './SearchForm.css';
import startPage from "../icon/startPage.png";
import backPage from "../icon/backPage.png";
import nextPage from "../icon/nextPage.png";
import lastPage from "../icon/lastPage.png";

export const SearchForm = () => {
    const navigate = useNavigate();
    return (
        <div className="searchForm">
            <div className="searchFormTitle">検索画面</div>
            <table className="itemsTable">
                <tbody>
                    <tr>
                        <td>
                            <span className="itemName">タイトル</span>
                            <input type="text" className="titleForm" />
                        </td>
                        <td className="partner">
                            <span className="itemName">取引先</span>
                            <input type="text" className="partnerFormInput" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <span className="itemName">&#12288;&#12288;詳細</span>
                            <input type="text" className="descriptionForm" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="itemName">&#12288;&#12288;期限</span>
                            <input type="date" className="dueDateForm" />
                            <span className="itemBetween">～</span>
                            <input type="date" className="dueDateForm" />
                        </td>
                        <td className="createdAt">
                            <span className="itemName">作成日時</span>
                            <input type="date" className="dueDateForm" />
                            <span className="itemBetween">～</span>
                            <input type="date" className="dueDateForm" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <div className="buttonForm">
                                <div className="leftButton"></div>
                                <button className="searchButton">検索</button>
                                <button className="switchingButton" onClick={() => { navigate("/InputForm"); }}>入力画面へ</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <div className="pageNation">
                <img src={startPage} className="pageNationButton" />
                <img src={backPage} className="pageNationButton" />
                <span className="pageNationButton">1</span>
                <img src={nextPage} className="pageNationButton" />
                <img src={lastPage} className="pageNationButton" />
            </div>
        </div>
    )
}
