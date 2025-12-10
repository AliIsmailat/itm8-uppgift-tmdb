import { useParams } from "react-router-dom";
import BackButton from "../components/ui/BackButton";
import ActorInfo from "../components/actor/ActorInfo";
import ActorMovies from "../components/actor/ActorMovies";

export default function ActorDetails() {
  const { id } = useParams();
  if (!id) return <p>No actor ID.</p>;

  const actorId = parseInt(id);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <BackButton />

      <ActorInfo actorId={actorId} />

      <ActorMovies actorId={actorId} />
    </div>
  );
}
