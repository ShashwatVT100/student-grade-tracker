import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      students:[
        {
          id:1,
          name:'Alice',
          subject:'Mathematics',
          grade:92,
          passed:true
        },
        {
          id:2,
          name:'Bob',
          subject:'Physics',
          grade:78,
          passed:true
        },
        {
          id:3,
          name:'Charlie',
          subject:'Chemistry',
          grade:45,
          passed:false
        }
      ],
      newStudent:{
        name:'',
        subject:'',
        grade:''
      }
    };
  }
  handleInputChange=(e)=>{
    const {name,value}=e.target;
    this.setState({
      newStudent:{
        ...this.state.newStudent,
        [name]:value
      }
    });
  };
  handleDeleteStudent=(studentId)=>{
    if(window.confirm('Are you sure to delete this student data?')){
      this.setState({
        students:this.state.students.filter(student=>student.id!==studentId)
      });
    }
  }
  handleAddSubmit=(e)=>{
    e.preventDefault();
    const {name,subject,grade}=this.state.newStudent;
    if(!name.trim()||!subject||!grade){
      alert('Please fill all the feilds!');
      return;
    }
    const gradeNumber=parseInt(grade,10);
    if(isNaN(gradeNumber)||gradeNumber<0||gradeNumber>100){
      alert('Please enter valid grade between 0 and 100!');
      return;
    }
    const newStudent={
      id: Date.now(),
      name:name.trim(),
      subject:subject,
      grade:gradeNumber,
      passed:gradeNumber>=60
    }
    this.setState({
      students:[...this.state.students,newStudent],
      newStudent:{
        name:'',
        subject:'',
        grade:''
      }
    });
  };
  renderStudentList(){
    if(this.state.students.length===0){
      return(
        <div className='no-students'>
          <p>No Students added yet. Add your first student below</p>
        </div>
      )
    }
    return this.state.students.map(student=>{
      return(
      <div key={student.id} className={`student-card ${student.passed?'passed':'failed'}`}>
        <div className='student-info'>
          <h3>{student.name}</h3>
          <p><strong>Subject:</strong> {student.subject}</p>
          <p><strong>Grade:</strong> {student.grade}%</p>
        </div>
        <div className='student-status'>
          <span className={student.passed?'status-passed':'status-failed'}>
            {student.passed?'PASSED':'FAILED'}
          </span>
        </div>
        <div className='student-actions'>
          <button onClick={()=>this.handleDeleteStudent(student.id)} className='delete-btn' title='Delete Student'>Delete</button>
        </div>
      </div>);
    })
  }
  render(){
    return(
      <div className='app'>
        <header className='app-header'>
          <h1>Student Grade Tracker</h1>
          <p>Class Component Design</p>
        </header>
        <main className='app-main'>
          <section className='students-section'>
            <h2>Student List ({this.state.students.length})</h2>
            <div className='students-grid'>
              {this.renderStudentList()}
            </div>
          </section>
          <section className='add-student-section'>
            <h2>Add New Student</h2>
            <form onSubmit={this.handleAddSubmit} className='add-student-form'>
              <div className='form-group'>
                <label htmlFor='studentName'>Student Name:</label>
                <input type='text' id='studentName' name='name'value={this.state.newStudent.name} onChange={this.handleInputChange} placeholder='Enter student name'/>
                <div className='form-group'>
                  <label htmlFor='studentSubject'>Subject:</label>
                  <select id='studentSubject' name='subject' value={this.state.newStudent.subject} onChange={this.handleInputChange}>
                    <option value='Mathematics'>Select a subject</option>
                    <option value='Physics'>Physics</option>
                    <option value='Chemistry'>Chemistry</option>
                    <option value='Biology'>Biology</option>
                    <option value='English'>English</option>
                    <option value='History'>History</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='studentGrade'>Grade(0-100):</label>
                  <input type='number' id='studentGrade' name='grade' value={this.state.newStudent.grade} onChange={this.handleInputChange} placeholder='Enter grade(0-100)' min='0' max='100'/>
                </div>
                <button type='submit' className='submit-btn'>Add Student</button>
              </div>
            </form>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
