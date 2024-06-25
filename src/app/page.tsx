import { Button } from "./components/Button";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Button to="/account" text="Consultar" />
    </main>
  );
}
