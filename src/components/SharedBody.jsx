
//crea uno sfondo comune per le pagine
//------------------------------------
//ho creato un componente riutilizzabile
//il quale può contenere al suo interno 
//altri componenti e/o strutture html
const SharedBody = ({ children }) => {
    return (
      <div className="relative min-h-screen bg-gray-100">
        {children}
      </div>
    );
  };
  
  export default SharedBody;
  