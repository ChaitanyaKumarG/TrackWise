import React, { useState, useEffect } from "react";
import postMarksService from "../../Services/Faculty/postingMarksServices";

const SuccessModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center p-5">
            <div className="mb-4">
              <i
                className="bi bi-check-circle-fill text-success"
                style={{ fontSize: "4rem" }}
              ></i>
            </div>
            <h4 className="mb-3">Marks Submitted Successfully!</h4>
            <button className="btn btn-primary btn-lg w-100" onClick={onClose}>
              <i className="bi bi-box-arrow-right me-2"></i>
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostMarks = () => {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    selectedClass: "",
    selectedSubject: "",
    selectedTestType: "",
    selectedDate: "",
  });

  const { selectedClass, selectedSubject, selectedTestType, selectedDate } =
    formData;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [classRes, subjectRes, testTypeRes] = await Promise.all([
          postMarksService.getClasses(),
          postMarksService.getSubjects(),
          postMarksService.getTestTypes(),
        ]);
        setClasses(classRes.data);
        setSubjects(subjectRes.data);
        setTestTypes(testTypeRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      postMarksService
        .getStudentsByClass(selectedClass)
        .then((res) => {
          setStudents(res.data);
          setMarks(
            res.data.map((student) => ({
              StudentID: student.StudentID,
              MarksObtained: "",
              Absent: false,
            }))
          );
        })
        .catch((error) => console.error("Error fetching students:", error))
        .finally(() => setLoading(false));
    }
  }, [selectedClass]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMarkChange = (studentID, value) => {
    setMarks((prev) =>
      prev.map((mark) =>
        mark.StudentID === studentID ? { ...mark, MarksObtained: value } : mark
      )
    );
  };

  const handleAbsentChange = (studentID, isAbsent) => {
    setMarks((prev) =>
      prev.map((mark) =>
        mark.StudentID === studentID
          ? { ...mark, Absent: isAbsent, MarksObtained: isAbsent ? "AB" : "" }
          : mark
      )
    );
  };

  const handleProceed = () => {
    if (
      !selectedClass ||
      !selectedSubject ||
      !selectedTestType ||
      !selectedDate
    ) {
      alert("Please fill all required fields.");
      return;
    }
    setShowStudents(true);
  };

  const handleSubmit = async () => {
    const invalidMarks = marks.some(
      (mark) =>
        !mark.Absent &&
        (mark.MarksObtained === "" ||
          isNaN(mark.MarksObtained) ||
          mark.MarksObtained < 0)
    );

    if (invalidMarks) {
      alert("Please enter valid marks or mark students as absent.");
      return;
    }

    const data = marks.map((mark) => ({
      StudentID: mark.StudentID,
      MarksObtained: mark.Absent ? "AB" : mark.MarksObtained,
      ClassID: selectedClass,
      SubjectID: selectedSubject,
      TestTypeID: selectedTestType,
      DateConducted: selectedDate,
    }));

    try {
      setLoading(true);
      await postMarksService.submitMarks(data);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting marks:", error);
      alert("Error submitting marks");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setShowStudents(false);
    setFormData({
      selectedClass: "",
      selectedSubject: "",
      selectedTestType: "",
      selectedDate: "",
    });
    window.location.reload();
  };

  if (loading) {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid min-vh-100 homepage-wrapper">
      {!showStudents ? (
        <div className="card shadow-sm mt-5">
          <div className="card-header bg-primary text-white py-3">
            <h4 className="mb-0 text-center">
              <i className="bi bi-pencil-square me-2"></i>
              Post Marks
            </h4>
          </div>
          <div className="card-body p-4">
            <div className="mb-4">
              <label className="form-label">
                <i className="bi bi-mortarboard me-2"></i>Class
              </label>
              <select
                className="form-select form-select-lg mb-3"
                name="selectedClass"
                value={selectedClass}
                onChange={handleFormChange}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.ClassID} value={cls.ClassID}>
                    {cls.ClassStandard}
                  </option>
                ))}
              </select>

              <label className="form-label">
                <i className="bi bi-book me-2"></i>Subject
              </label>
              <select
                className="form-select form-select-lg mb-3"
                name="selectedSubject"
                value={selectedSubject}
                onChange={handleFormChange}
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub.SubjectID} value={sub.SubjectID}>
                    {sub.SubjectName}
                  </option>
                ))}
              </select>

              <label className="form-label">
                <i className="bi bi-list-check me-2"></i>Test Type
              </label>
              <select
                className="form-select form-select-lg mb-3"
                name="selectedTestType"
                value={selectedTestType}
                onChange={handleFormChange}
              >
                <option value="">Select Test Type</option>
                {testTypes.map((tt) => (
                  <option key={tt.TestTypeID} value={tt.TestTypeID}>
                    {tt.TestName}
                  </option>
                ))}
              </select>

              <label className="form-label">
                <i className="bi bi-calendar me-2"></i>Date
              </label>
              <input
                type="date"
                className="form-control form-control-lg"
                name="selectedDate"
                value={selectedDate}
                onChange={handleFormChange}
              />
            </div>

            <button
              className="btn btn-primary btn-lg w-100"
              onClick={handleProceed}
              disabled={
                !selectedClass ||
                !selectedSubject ||
                !selectedTestType ||
                !selectedDate
              }
            >
              <i className="bi bi-arrow-right-circle me-2"></i>
              Proceed to Enter Marks
            </button>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
            <button
              className="btn btn-link text-white p-0"
              onClick={() => setShowStudents(false)}
            >
              <i className="bi bi-arrow-left-circle fs-4"></i>
            </button>
            <h4 className="mb-0">Enter Marks</h4>
            <div style={{ width: "24px" }}></div>
          </div>
          <div className="card-body p-0">
            <div className="p-3 bg-light border-bottom">
              <div className="row g-2">
                <div className="col-6">
                  <small className="text-muted">Class:</small>
                  <div>
                    {
                      classes.find((c) => c.ClassID === selectedClass)
                        ?.ClassStandard
                    }
                  </div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Subject:</small>
                  <div>
                    {
                      subjects.find((s) => s.SubjectID === selectedSubject)
                        ?.SubjectName
                    }
                  </div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Test:</small>
                  <div>
                    {
                      testTypes.find((t) => t.TestTypeID === selectedTestType)
                        ?.TestName
                    }
                  </div>
                </div>
                <div className="col-6">
                  <small className="text-muted">Date:</small>
                  <div>{new Date(selectedDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="text-center">#</th>
                    <th>Name</th>
                    <th className="text-center">Marks</th>
                    <th className="text-center">Absent</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.StudentID}>
                      <td className="text-center">{index + 1}</td>
                      <td>{student.StudentName}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-lg text-center"
                          placeholder="Marks"
                          value={
                            marks.find(
                              (mark) => mark.StudentID === student.StudentID
                            )?.MarksObtained || ""
                          }
                          onChange={(e) =>
                            handleMarkChange(student.StudentID, e.target.value)
                          }
                          disabled={
                            marks.find(
                              (mark) => mark.StudentID === student.StudentID
                            )?.Absent
                          }
                        />
                      </td>
                      <td className="text-center">
                        <div className="form-check d-flex justify-content-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={
                              marks.find(
                                (mark) => mark.StudentID === student.StudentID
                              )?.Absent || false
                            }
                            onChange={(e) =>
                              handleAbsentChange(
                                student.StudentID,
                                e.target.checked
                              )
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer p-3">
            <button
              className="btn btn-primary btn-lg w-100"
              onClick={handleSubmit}
            >
              <i className="bi bi-save me-2"></i>
              Submit Marks
            </button>
          </div>
        </div>
      )}
      <SuccessModal show={showSuccessModal} onClose={handleModalClose} />
    </div>
  );

  
};



export default PostMarks;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PostMarks = () => {
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [testTypes, setTestTypes] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [selectedTestType, setSelectedTestType] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [marks, setMarks] = useState([]);

//   useEffect(() => {
//     // Fetch classes, subjects, and test types
//     axios
//       .get("http://127.0.0.1:1321/class")
//       .then((res) => setClasses(res.data));
//     axios
//       .get("http://127.0.0.1:1321/subject")
//       .then((res) => setSubjects(res.data));
//     axios
//       .get("http://127.0.0.1:1321/testtype")
//       .then((res) => setTestTypes(res.data));
//   }, []);

//   const fetchStudents = () => {
//     if (selectedClass) {
//       axios
//         .get(`http://127.0.0.1:1321/student/class/${selectedClass}`)
//         .then((res) => {
//           setStudents(res.data);
//           setMarks(
//             res.data.map((student) => ({
//               StudentID: student.StudentID,
//               MarksObtained: "",
//               Absent: false, // Default to not absent
//             }))
//           );
//         });
//     }
//   };

//   const handleMarkChange = (studentID, value) => {
//     setMarks((prev) =>
//       prev.map((mark) =>
//         mark.StudentID === studentID ? { ...mark, MarksObtained: value } : mark
//       )
//     );
//   };

//   const handleAbsentChange = (studentID, isAbsent) => {
//     setMarks((prev) =>
//       prev.map((mark) =>
//         mark.StudentID === studentID
//           ? { ...mark, Absent: isAbsent, MarksObtained: isAbsent ? "AB" : "" }
//           : mark
//       )
//     );
//   };

//   const handleSubmit = () => {
//     if (
//       !selectedClass ||
//       !selectedSubject ||
//       !selectedTestType ||
//       !selectedDate
//     ) {
//       alert(
//         "Please fill all required fields (Class, Subject, Test Type, and Date)."
//       );
//       return;
//     }

//     const invalidMarks = marks.some(
//       (mark) =>
//         !mark.Absent &&
//         (mark.MarksObtained === "" ||
//           isNaN(mark.MarksObtained) ||
//           mark.MarksObtained < 0) &&
//         !mark.Absent
//     );

//     if (invalidMarks) {
//       alert("Please enter valid marks or mark students as absent.");
//       return;
//     }

//     const data = marks.map((mark) => ({
//       StudentID: mark.StudentID,
//       MarksObtained: mark.Absent ? "AB" : mark.MarksObtained,
//       ClassID: selectedClass,
//       SubjectID: selectedSubject,
//       TestTypeID: selectedTestType,
//       DateConducted: selectedDate,
//     }));

//     axios
//       .post("http://127.0.0.1:1321/studentmarks", data)
//       .then(() => alert("Marks submitted successfully"))
//       .catch(() => alert("Error submitting marks"));
//   };

//   return (
//     <div className="container my-4">
//       <h1 className="text-center mb-4">Post Marks</h1>

//       <div className="row g-3 mb-3">
//         <div className="col-md-3">
//           <label className="form-label">Class:</label>
//           <select
//             className="form-select"
//             value={selectedClass}
//             onChange={(e) => setSelectedClass(e.target.value)}
//             onBlur={fetchStudents}
//           >
//             <option value="">Select Class</option>
//             {classes.map((cls) => (
//               <option key={cls.ClassID} value={cls.ClassID}>
//                 {cls.ClassStandard}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-3">
//           <label className="form-label">Subject:</label>
//           <select
//             className="form-select"
//             value={selectedSubject}
//             onChange={(e) => setSelectedSubject(e.target.value)}
//           >
//             <option value="">Select Subject</option>
//             {subjects.map((sub) => (
//               <option key={sub.SubjectID} value={sub.SubjectID}>
//                 {sub.SubjectName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-3">
//           <label className="form-label">Test Type:</label>
//           <select
//             className="form-select"
//             value={selectedTestType}
//             onChange={(e) => setSelectedTestType(e.target.value)}
//           >
//             <option value="">Select Test Type</option>
//             {testTypes.map((tt) => (
//               <option key={tt.TestTypeID} value={tt.TestTypeID}>
//                 {tt.TestName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-3">
//           <label className="form-label">Date:</label>
//           <input
//             type="date"
//             className="form-control"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//           />
//         </div>
//       </div>

//       {students.length > 0 && (
//         <div>
//           <h3 className="text-center my-4">Enter Marks</h3>
//           <table className="table table-bordered text-center">
//             <thead className="table-light">
//               <tr>
//                 <th>#</th>
//                 <th>Student Name</th>
//                 <th>Marks</th>
//                 <th>Absent</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student, index) => (
//                 <tr key={student.StudentID}>
//                   <td>{index + 1}</td>
//                   <td>{student.StudentName}</td>
//                   <td>
//                     <input
//                       type="number"
//                       className="form-control"
//                       placeholder="Marks"
//                       value={
//                         marks.find(
//                           (mark) => mark.StudentID === student.StudentID
//                         )?.MarksObtained || ""
//                       }
//                       onChange={(e) =>
//                         handleMarkChange(student.StudentID, e.target.value)
//                       }
//                       disabled={
//                         marks.find(
//                           (mark) => mark.StudentID === student.StudentID
//                         )?.Absent
//                       }
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       checked={
//                         marks.find(
//                           (mark) => mark.StudentID === student.StudentID
//                         )?.Absent || false
//                       }
//                       onChange={(e) =>
//                         handleAbsentChange(student.StudentID, e.target.checked)
//                       }
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <button
//         className="btn btn-primary w-100"
//         onClick={handleSubmit}
//         disabled={
//           !selectedClass ||
//           !selectedSubject ||
//           !selectedTestType ||
//           !selectedDate
//         }
//       >
//         <i className="bi bi-send"></i> Submit Marks
//       </button>
//     </div>
//   );
// };

// export default PostMarks;
