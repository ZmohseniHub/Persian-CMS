import "./ErrorBox.css"

export default function ErrorBox({ msg }) {
    return (
        <div className="error-box">
            <h1>{msg}</h1>
        </div>
    )
}
