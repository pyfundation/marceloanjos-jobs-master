import React, { useEffect, useState, Fragment } from "react";
import Chart from 'react-google-charts'
import { connect} from "react-redux";
import {trendData, getTrending} from './actions/data' 
import {PropTypes} from 'prop-types'
import loading from './loading.gif'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const App = ({trendData,sending,dailyTrending, result, getTrending,keyArr}) => {
  
  useEffect(()=>{
   // console.log('Hello');
   async function getTrend(){
    await getTrending();
   }
    getTrend();
   },[getTrending]);
   
   const handleUser = async(e) => {
    //console.log(Usering);
    setUser({
      ...User,
       Usering : e.target.value
    });
  }

  const handleToken = async(e) => {
    setToken({
      ...Token,
       Tokening : e.target.value
    });
  }
  
  const handleTrend1 = async(e) => {
    //console.log(trending1);
    settrend1({
      ...trend1,
       trending1 : e.target.value
    });
  }

  const handleTrend2 = async(e) => {
    settrend2({
      ...trend2,
       trending2 : e.target.value
    });
  }

  const handleTrend3 = async(e) => {
    settrend3({
      ...trend3,
       trending3 : e.target.value
    })
  }

  const handleCountryTrend1 = async(e) => {
    //console.log(Countrytrending1);
    setCountrytrend1({
      ...Countrytrend1,
       Countrytrending1 : e.target.value
    });
  }

  const handleCountryTrend2 = async(e) => {
    setCountrytrend2({
      ...Countrytrend2,
       Countrytrending2 : e.target.value
    });
  }

  const handleCountryTrend3 = async(e) => {
    setCountrytrend3({
      ...Countrytrend3,
       Countrytrending3 : e.target.value
    })
  }
  
  const handleClickSetCountryes = async(e) =>{
    console.log('clicked Set');
    if(Countrytrending1.length !== 0 && Countrytrending2.length !== 0 && Countrytrending3.length !== 0){
      console.log('Countryes Seted');
    }
  }

  const handleClickCompare = async(e) =>{
    console.log('clicked Compare');
    if((trending1.length !== 0 && trending2.length !== 0 && trending3.length !== 0) && 
    (Countrytrending1.length !== 0 && Countrytrending2.length !== 0 && Countrytrending3.length !== 0)){
      trendData(trending1,trending2,trending3);
    }
  }
  // ------------------------------------------
  const handleClickSend = async(e) =>{
    if(Usering.length !== 0 && Tokening.length !== 0 ){
    console.log('clicked Send', data);
    }
  }
  // ------------------------------------------
  // ------------------------------------------

  const [User,setUser] = useState({
    Usering:'User'
   })
   const {Usering} = User;
 
   const [Token,setToken] = useState({
     Tokening:'Token'
    })
    const {Tokening} = Token;

  const [trend1,settrend1] = useState({
   trending1:'Brazil'
  })
  const {trending1} = trend1;

  const [trend2,settrend2] = useState({
    trending2:'Paraguay'
   })
   const {trending2} = trend2;

   const [trend3,settrend3] = useState({
    trending3:'Argentina'
   })
   const {trending3} = trend3;

   const [Countrytrend1,setCountrytrend1] = useState({
    Countrytrending1:'Brazil'
   })
   const {Countrytrending1} = Countrytrend1;
 
   const [Countrytrend2,setCountrytrend2] = useState({
     Countrytrending2:'Paraguay'
    })
    const {Countrytrending2} = Countrytrend2;
 
    const [Countrytrend3,setCountrytrend3] = useState({
     Countrytrending3:'Argentina'
    })
    const {Countrytrending3} = Countrytrend3;
 
  const data = result.length === 0 || result.length === 1 ? [[1,1,1,1]]: result;
  const options = {
    title: "Trend Comparison",
    curveType: "function",
    legend: { position: "bottom" }
  };

  const options2 = [
    'Line Chart', 'Scatter Chart'
  ];
  const defaultOption = options2[0];
  const[option,setOption] = useState({
    chart:'Line Chart'
  });

  const {chart} = option;

  return (
    <Fragment>
    <div className="container">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4" style={{"textAlign":"center"}}>Compare Country Trends</h1>
        </div>
      </div>

      <div className ="row">
      <div className="col-md-2 col-sm-12" style={{textAlign:'center'}}>
        {dailyTrending ? <img 
                            src={loading} 
                          style={{width:"200px",height:"200px"}}
                        />: 
                        <div><h6>Trending Searches</h6>
                        <i class="fa fa-arrow-down" aria-hidden="true"></i>{keyArr.map((x)=> 
                       <div> {x}</div>
                    )}</div>}
      </div>

    <div className="col-md-10 col-sm-12">
    <div  style={{"textAlign":"center"}}>
        <h3 className="display-4" style={{"textAlign":"center"}}>USER</h3>
        <textarea style={{"margin":"10px","width":"30%"}} placeholder = {String(User.Usering)} onChange={handleUser}></textarea>
        <h3 className="display-4" style={{"textAlign":"center"}}>TOKEN</h3>
        <textarea style={{"margin":"10px","width":"30%"}} placeholder = {String(Token.Tokening)} onChange={handleToken}></textarea>
      </div>
    <div  style={{"textAlign":"center"}}>
        <textarea style={{"margin":"10px","width":"30%"}} placeholder = {String(trend1.trending1)} onChange={handleCountryTrend1}></textarea>
        <textarea style={{"margin":"10px","width":"30%"}} placeholder = {String(trend2.trending2)} onChange={handleCountryTrend2}></textarea>
        <textarea style={{"margin":"10px","width":"30%"}} placeholder = {String(trend3.trending3)} onChange={handleCountryTrend3}></textarea>
      </div>
      <div  style={{"textAlign":"center"}}>
        <textarea style={{"margin":"10px","width":"30%"}} placeholder = "To Search in Country" onChange={handleTrend1}></textarea>
        <textarea style={{"margin":"10px","width":"30%"}} placeholder = "To Search in Country" onChange={handleTrend2}></textarea>
        <textarea style={{"margin":"10px","width":"30%"}} placeholder = "To Search in Country" onChange={handleTrend3}></textarea>
      </div>
     
      <div style={{"textAlign":"center"}}>
        <button style={{margin:'10px'}} type="button" className="btn btn-success" onClick={handleClickSetCountryes}>Country Set</button>
      </div>

      <div style={{"textAlign":"center"}}>
        <button style={{margin:'10px'}} type="button" className="btn btn-success" onClick={handleClickCompare}>Country Trends</button>
      </div>

      <div style={{"textAlign":"center"}}>
        <button style={{margin:'20px'}} type="button" className="btn btn-success" onClick={handleClickSend}>Send Sheets</button>
      </div>

    <div style={{"textAlign":"center"}}>
      <Dropdown  className = "btn btn-light" style={{width:'fit-content !important'}} onChange = {(e)=>{setOption({
        ...option,
        chart:e.value
      })}} options={options2}  value={defaultOption} placeholder="Select chart"></Dropdown>
    </div>

      <div style={{"textAlign":"center", "margin":"20px"}}>
      {sending ? <img src = { loading } /> : 
      result.length === 1  && result[0] && result[0].length ? <h1>No comparisons found</h1>:

      <div>
        {data.length>1 ?
        chart === 'Line Chart' ? 
              <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={options}
              />: 
              <Chart
                  chartType="ScatterChart"
                  width="100%"
                  height="100%"
                  data={data}
                  options={options}
                  legendToggle
              />
        :null}
      </div>}
    </div>
  </div>
</div>
</div>

</Fragment>
  );
}

App.propTypes = {
trendData:PropTypes.func.isRequired,
sending:PropTypes.bool.isRequired,
dailyTrending:PropTypes.bool.isRequired,
result:PropTypes.array.isRequired,
getTrending:PropTypes.func.isRequired,
keyArr:PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
 sending:state.trend.sending,
 dailyTrending:state.trend.dailyTrending,
 result:state.trend.result,
keyArr:state.trend.keyArr
 });

export default connect(mapStateToProps, {
 trendData, getTrending
})(App);
