import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';

import './style.scss';

import RegulationNav from './regulationNav';
import regulationAction from '../../state/actions/regulation.action';

interface RegulationDetailsProps {
    getRegulationDetails: (regulationId: string) => Promise<{  bylaw: any }>;
}

const Regulations = ({ getRegulationDetails }: RegulationDetailsProps) => {
    const [courses, setCourses] = useState<any[]>([]);
    const [regulation, setRegulation] = useState<any>(null);
    const { regulationId } = useParams<string>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRegulationDetails = async () => {
            if (regulationId) {
                try {
                    const {  bylaw } = await getRegulationDetails(regulationId);


                    setRegulation(bylaw);
                } catch (error) {
                    console.error('Error fetching regulation details:', error);
                }
            }
        };

        fetchRegulationDetails();
    }, [regulationId, getRegulationDetails]);

    const handleBackClick = () => {
        navigate('/regulations');
    };

    return (
        <div className="container555">
 



<RegulationNav/>    
<div className='regulation-detail-container'>
    
    
    </div>  {regulation?.code}  </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getRegulationDetails: regulationAction.viewAllRegulationsAction,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(Regulations);
