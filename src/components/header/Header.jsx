import './header.css'

function Header({ title }) {
    console.log(title);
    return (
        <div className="header">
            {title}
        </div>
    )
}

export default Header