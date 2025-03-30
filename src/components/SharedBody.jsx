
//crea uno sfondo comune per le pagine
//------------------------------------
//ho creato un componente riutilizzabile
//il quale può contenere al suo interno 
//altri componenti e/o strutture html
const SharedBody = ({ children }) => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700">
        {children}
      </div>

    </>
  );
};

export default SharedBody;
