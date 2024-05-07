import SignInForm from "@/components/SignInComponent";

export default async function Home() {
  return (
    <div className="flex flex-col-reverse sm:flex-row">
      <SignInForm />
    </div>
  );
}
