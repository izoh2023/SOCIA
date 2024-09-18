export default function Home() {
  return (
    <>
    <div className="h-screen flex flex-col justify-center gap-y-4 text-center ">
      <h1 className="font-bold text-2xl animate-bounce">welcome student namanisha wewe spencer</h1>
      <p className="font-semibold text-xl">this is the homepage</p>
      <p className="font-medium text-lg">navigate to <a href="http://localhost:3000/apiclient" className="underline text-blue-500 hover:text-blue-800"> http://localhost:3000/apiclient </a> to register</p>
    </div>
      
    </>
  );
}
