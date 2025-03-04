import Form from "./Form";

interface NewCardProps {
    onAdd: (title: string, content: string) => void;
}

const NewCard = ({onAdd} : NewCardProps) => {
    return(
        <div>
            <h1>Add new Note</h1>
            <Form onAdd={onAdd}/>
        </div>
    )
}

export default NewCard;