import RegisterationNavbar from '../../shared/registerationNavbar';
import MainNavBar from '../../shared/mainNavbar';
import OueriesNavBar from '../Oueries Navbar';
import RankOfStudentForm from '../Rank of student form';



function RankOfStudentPage({ activeItem}:any) {
    return (
      <div >
        <RegisterationNavbar/>
        <MainNavBar activeItem="Oueries"/>
        <OueriesNavBar  activeItem={ activeItem}/>
        <RankOfStudentForm />
        
      </div>
    );
  }
  
  export default RankOfStudentPage;