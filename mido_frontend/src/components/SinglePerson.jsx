import { toast } from "react-toastify";
import { useDeletePersonMutation } from "../features/api/apiSlice";
import { Link, useNavigate } from "react-router-dom";

const SinglePerson = ({person}) => {
    console.log('WORKER component')
    const navigate = useNavigate()
  
    const [deletePerson, {isLoading}] = useDeletePersonMutation()
    const canDelete = person?._id && !isLoading;
    const onDeletePerson = async() => {
      if (canDelete) {
        try {
          await deletePerson(person._id).unwrap()
        } catch (err) {
          toast.error(err.message)
        }
      }
    }
  
    return (
      <div key={person._id}>
        <h3>{person.name}</h3>
        <h5>{person.address}</h5>
        <h5>{person.age}</h5>
        <p>id: {person._id}</p>
        <button onClick={onDeletePerson}>delete</button>
        <Link to={`/workers/${person._id}`}>View person</Link>
        <Link to={`/edit/${person._id}`}>Edit person</Link>
      </div>
    )
}

export default SinglePerson