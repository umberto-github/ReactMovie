
//crea uno sfondo comune per le pagine
//------------------------------------
//ho creato un componente riutilizzabile
//il quale può contenere al suo interno 
//altri componenti e/o strutture html
const SharedBody = ({ children }) => {
  return (
    <>
      <div className="bg-gray-100">
        <div className="h-10"></div>
        {children}
        <div className="h-10"></div>
      </div>

    </>
  );
};

export default SharedBody;
