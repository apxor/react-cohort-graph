/**
 * Created by jyothi on 30/5/17.
 */
import React from 'react';
import PropTypes from 'prop-types';

class ReactCohortGraph extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <div>

            </div>
        )
    }

}

ReactCohortGraph.propTypes = {
    data : PropTypes.object.isRequired,
    cellClickEvent : PropTypes.func,
    showEmptyDataMessage : PropTypes.bool,
    customEmptyDataMessage : PropTypes.string,
    columnClickEvent : PropTypes.func,
    maxDays : PropTypes.number,
    maxWeeks : PropTypes.number,
    maxMonths : PropTypes.number,
    //enableTooltip : PropTypes.bool, TODO
    showAbsolute : PropTypes.bool,
    toggleValues : PropTypes.bool,
    showHeaderValues : PropTypes.bool
};

export default ReactCohortGraph;