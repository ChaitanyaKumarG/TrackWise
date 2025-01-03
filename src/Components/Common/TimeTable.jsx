const TimeTable = () => {
 
  return (
    <div className="d-flex align-items-center justify-content-center bg-light min-vh-100 homepage-wrapper">
      <div className="container px-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between justify-content-around">
              <i className="bi bi-x-octagon-fill fs-1 m-0 p-0"></i>
              <h5 className="mt-2"> No Time-Tables uploaded</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTable;
