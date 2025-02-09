import { useNavigate } from 'react-router-dom';
import './SearchForm.css';

export const SearchForm = () => {
    const navigate = useNavigate();
    return (
        <div className="searchForm">
            <form className="searchItmes">
                <table className="searchItemsTable">
                    <tr>
                        <td colSpan={3} className="searchTitle">
                            検索画面
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="searchItemName">タイトル：</span>
                            <input type="text" className="searchTextForm" />
                        </td>
                        <td>
                            <span className="searchItemName">取引先・相手：</span>
                            <input type="text" className="searchPartnerForm" />
                        </td>
                        <td>
                            <span className="searchItemName">期限：</span>
                            <input type="date" className="searchDueDateForm" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="searchItemName">　　詳細：</span>
                            <input type="text" className="searchDescriptionForm" />
                        </td>
                        <td colSpan={2} className="searchDate">
                            <span className="searchItemName">作成日時：</span>
                            <input type="date" className="searchDueDateForm" />
                            <span className="searchItemName2"> ～ </span>
                             <input type="date" className="searchDueDateForm" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="searchItemButton">
                            <button className="searchButton">検索</button>
                            <button className="backButton" onClick={() => {navigate("/InputForm");}}>入力画面へ</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    )
}
