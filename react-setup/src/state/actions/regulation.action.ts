import { Dispatch } from 'redux';
import { statusAction, fetchAction } from '.';
import regulationApi from '../../api/regulation.api'; // Ensure you have an API module for regulations

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
      const { data: { message, regulationRules } } = await regulationApi.viewRegulationRules(regulationId); // Adjust API call if different
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return regulationRules;
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
      const { data: { message, regulationCourses } } = await regulationApi.viewRegulationCourses(regulationId); // Adjust API call if different
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return regulationCourses;
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return null;
    }
  };
}

export default new Regulation();
