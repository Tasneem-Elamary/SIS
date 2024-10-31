import { Dispatch } from 'redux';
import { statusAction, fetchAction } from '.';
import regulationApi from '../../api/regulation.api'; 
import RegulationType from '../../interfaces/regulation';
import RegulationRuleType from '../../interfaces/domain/regulationRules';
import GradeType from '../../interfaces/domain/regulaionGrade';
class Regulation {
  viewAllRegulationsAction = () => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, bylaws } } = await regulationApi.viewAllRegulations(); 
    if(bylaws){
      console.log("regulations",bylaws)
    }
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return bylaws;
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
    }
  };

  viewRegulationDetailsAction = (regulationId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      console.log("debuggggggginndggggggg")
      const { data: { message, bylaw } } = await regulationApi.viewRegulationDetails(regulationId); 
      if(bylaw){
        console.log("regulation details",bylaw)
      }
 
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return bylaw;
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return null;
    }
  };

  viewRegulationRulesAction = (regulationId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const response = await regulationApi.viewRegulationRules(regulationId); 
     const data=response.data

        const {BylawRules,Grades} =data.bylawLimits
      if(data) console.log(BylawRules,Grades)

      dispatch(statusAction.addSuccessStatus(data.message));
      dispatch(fetchAction.fetchingFailed());
      return {Grades,BylawRules};
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return null;
    }
  };

  viewRegulationCoursesAction = (regulationId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const response= await regulationApi.viewRegulationCourses(regulationId); 
    const {code,Courses}=response.data.bylawCourses
    if(response)
    console.log(Courses)
      dispatch(statusAction.addSuccessStatus(response.data.msg));
      dispatch(fetchAction.fetchingFailed());
      return Courses;
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return null;
    }
  };
    // Action to add regulation details
    addRegulationDetailsAction = (FacultyId: string, regulationDetail: RegulationType) => async (dispatch: Dispatch) => {
      try {
        dispatch(statusAction.clearStatus());
        dispatch(fetchAction.fetchingTime());
        const { data: { msg ,bylaw} } = await regulationApi.addRegulationDetails(FacultyId, regulationDetail);
        dispatch(statusAction.addSuccessStatus(msg));
        dispatch(fetchAction.fetchingFailed());
        console.log('regulation',bylaw)
        return bylaw
      } catch (e) {
        dispatch(fetchAction.fetchingFailed());
        dispatch(statusAction.addErrorStatus(e as Error));
      }
    };
    // Action to add regulation limits
    addRegulationLimitsAction = (regulationId: string, limits: RegulationRuleType[]) => async (dispatch: Dispatch) => {
      try {
        dispatch(statusAction.clearStatus());
        dispatch(fetchAction.fetchingTime());
        const { data: { msg } } = await regulationApi.addRegulationLimits(regulationId, limits);
        dispatch(statusAction.addSuccessStatus(msg));
        dispatch(fetchAction.fetchingFailed());
      } catch (e) {
        dispatch(fetchAction.fetchingFailed());
        dispatch(statusAction.addErrorStatus(e as Error));
      }
    };
     // Action to add regulation grades
  addRegulationGradesAction = (regulationId: string, grades: GradeType[]) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { msg } } = await regulationApi.addRegulationGrades(regulationId, grades);
      dispatch(statusAction.addSuccessStatus(msg));
      dispatch(fetchAction.fetchingFailed());
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
    }
  };
}

export default new Regulation();
