import { useNavigate } from "react-router-dom";
interface BackButtonProps {
  to?: string;
  label?: string;
}

// ⚠️⚠️⚠️⚠️⚠️
// i framtiden, när du vill navigera till en
// specifik path, skriv:
{
  /* <BackButton to="/" label="Back to home" /> */
}
// i home istället för att skriva: <BackButton />

export default function BackButton({ to, label = "← Back" }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="mb-10 px-4 py-2 bg-white hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
    >
      {label}
    </button>
  );
}
