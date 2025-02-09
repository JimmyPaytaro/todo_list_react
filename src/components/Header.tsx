
import './Header.css';

export const Header = () => {


    // 本日の日付を取得
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return (
            <header>
                <div className="today">{`${year}/${month}/${day}`}</div>
                <div className="headerContents">
                    <h1 className="title">ToDoリスト</h1>
                </div>
            </header>
    )
}
