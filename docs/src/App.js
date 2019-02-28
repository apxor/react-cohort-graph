import React, {Component, Fragment} from 'react';
import ReactCohortGraph from 'react-cohort-graph';

const DATA = {
    days: {
        "05-22-2016": [200, 180, 120, 80, 50, 40, 30, 20, 50, 40, 23, 43, 20, 34, 30, 20, 10, 5],
        "05-23-2016": [300, 180, 120, 80, 50, 20, 15, 10, 5, 5, 5, 40, 23, 15, 10, 5, 1],
        "05-24-2016": [200, 180, 120, 80, 50, 20, 15, 10, 5, 5, 5, 4, 2, 1, 4, 5],
        "05-25-2016": [200, 180, 120, 80, 50, 20, 15, 10, 5, 5, 5, 3, 3, 2, 1],
        "05-26-2016": [300, 180, 120, 80, 50, 20, 15, 10, 5, 5, 5, 5, 3, 1],
        "05-27-2016": [200, 180, 120, 80, 50, 20, 15, 10, 5, 5, 5, 3, 2],
        "05-28-2016": [300, 180, 120, 80, 50, 20, 15, 10, 5, 5, 5, 2],
        "05-29-2016": [200, 180, 120, 80, 50, 20, 15, 10, 5, 5, 5],
        "06-30-2016": [300, 180, 120, 80, 50, 20, 15, 10, 5, 2],
        "06-01-2016": [200, 180, 120, 80, 50, 20, 10, 5, 1],
        "06-02-2016": [300, 180, 120, 80, 50, 20, 10, 5],
        "06-03-2016": [200, 120, 80, 30, 20, 5, 1],
        "06-04-2016": [200, 80, 30, 10, 5, 3],
        "06-05-2016": [300, 180, 100, 80, 70],
        "06-06-2016": [200, 120, 80, 40],
        "06-07-2016": [200, 80, 30],
        "06-08-2016": [300, 180],
        "06-09-2016": [200]
    },
    weeks: {
        "week1": [200, 10, 20],
        "week2": [300, 200],
        "week3": [200]
    },
    months: {
        "month1": [200, 10, 20, 30],
        "month2": [300, 200, 150],
        "month3": [200, 110],
        "month4": [100]
    }
};

class App extends Component {
    render() {
        return (
            <Fragment>
                <div id="header_wrap" className="outer">
                    <header className="inner">
                        <a id="forkme_banner" href="https://github.com/apxor/react-cohort-graph">View on GitHub</a>

                        <h1 id="project_title">react-cohort-graph</h1>
                        <h2 id="project_tagline">Cohort Analysis Graph with ReactJS</h2>


                        <section id="downloads">
                            <a className="zip_download_link" href="https://github.com/apxor/react-cohort-graph/zipball/master">Download this project as a .zip file</a>
                            <a className="tar_download_link" href="https://github.com/apxor/react-cohort-graph/tarball/master">Download this project as a tar.gz file</a>
                        </section>

                    </header>
                </div>
                <div id="main_content_wrap" className="outer">
                    <section id="main_content" className="inner">
                        <p><a href="https://badge.fury.io/js/react-cohort-graph"><img
                            src="https://badge.fury.io/js/react-cohort-graph.svg" alt="npm version"/></a></p>

                        <p>Cohort Analysis Graph using ReactJS</p>

                        <ReactCohortGraph
                            data={DATA}
                            headerFormatter={cell => {
                                console.info(cell);
                                return cell.label;
                            }}
                            cellFormatter={cell => {
                                console.info(cell);
                                return cell[cell.valueType];
                            }}
                        />

                        <h5 id="documentation-props">Documentation (Props)</h5>

                        <div className="highlighter-rouge">
                            <div className="highlight">
<pre className="highlight">
<code>
    {`{
        data : PropTypes.object.isRequired, //{days: [], weeks: [], months: []}
        dataType: PropTypes.string, //keys of data
        defaultValueType: PropTypes.string, //["value", "percent"]
        cellClickEvent : PropTypes.func,
        showEmptyDataMessage : PropTypes.bool,
        customEmptyDataMessage : PropTypes.any,
        columnClickEvent : PropTypes.func,
        shadeColor: PropTypes.string, //#3f83a3
        headerCellColor: PropTypes.string,
        bodyCellColor: PropTypes.string,
        keyCellColor: PropTypes.string,
        labelFormatter: PropTypes.func, //function(obj){ return formattedLabel;}
        headerFormatter: PropTypes.func, //function(obj){ return formattedHeader;}
        cellFormatter: PropTypes.func, //function(obj){ return formattedCell;}
        //enableTooltip : PropTypes.bool, TODO
        showAbsolute : PropTypes.bool,
        toggleValues : PropTypes.bool,
        showHeaderValues : PropTypes.bool,
        onStoreUpdate : PropTypes.func, //function(store, currentType, valueType)
        //Styles
        headerCellStyles: PropTypes.object,
        bodyCellStyles: PropTypes.object,
        tableCellStyles: PropTypes.object,
        tableStyles: PropTypes.object,
        tableRowStyles: PropTypes.object,
        tableHeadingStyles: PropTypes.object,
        tableBodyStyles: PropTypes.object,
        fixedTablePartStyles: PropTypes.object,
        wrapperStyles: PropTypes.object,
        scrollableTablePartStyles: PropTypes.object,
        scrollableTableContentStyles: PropTypes.object,
        headerValueStyles: PropTypes.object,
        headerLabelStyles: PropTypes.object,
    }`}
</code>
</pre>
                            </div>
                        </div>

                        <p><a href="https://arajajyothibabu.github.io/retention-graph-cohort-analysis/">Non React Version</a></p>

                    </section>
                </div>
                <div id="footer_wrap" className="outer">
                    <footer className="inner">
                        <p className="copyright">react-cohort-graph maintained by <a href="https://github.com/apxor">apxor</a></p>
                    </footer>
                </div>
            </Fragment>
        );
    }
}

export default App;
