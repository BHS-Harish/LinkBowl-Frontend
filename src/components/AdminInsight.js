import React from 'react';
import {Container} from 'react-bootstrap';
import {Progress} from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import date from 'date-and-time';
import {useSelector} from 'react-redux';
import './AdminStyle.css';
function AdminInsight(){
    const clicks=useSelector((state)=>state.user.user?.clicks);
    const views=useSelector((state)=>state.user.user?.views);
    const totalClicks=useSelector((state)=>state.user.user?.totalClicks);
    const totalViews=useSelector((state)=>state.user.user?.totalViews);
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );
    const options1 = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Views ( Date wise )',
          },
        },
      };
      const options2 = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Clicks ( Date wise )',
          },
        },
      };
    const labels = [date.format(date.addDays(new Date(),-6),"DD MMM"),date.format(date.addDays(new Date(),-5),"DD MMM"),date.format(date.addDays(new Date(),-4),"DD MMM"),date.format(date.addDays(new Date(),-3),"DD MMM"),date.format(date.addDays(new Date(),-2),"DD MMM"),date.format(date.addDays(new Date(),-1),"DD MMM"),date.format(date.addDays(new Date(),0),"DD MMM")];

    const data1 = {
    labels,
    datasets: [
        {
        label: 'Views',
        data: views,
        borderColor: '#000AFF',
        backgroundColor: '#000AFF50',
        }
    ],
    };
    const data2 = {
        labels,
        datasets: [
            {
            label: 'Clicks',
            data: clicks,
            borderColor: '#000AFF',
            backgroundColor: '#000AFF50',
            }
        ],
        };
    return(
        <Container fluid className="vw-100 d-flex flex-column align-items-center">
            <div className="admininsight-container">
                <div className="admininsight-container-subpart">
                    <h5>TOTAL VIEWS</h5>
                    <p>{totalViews}</p>
                    <h5>TODAY VIEWS</h5>
                    <p>{views?views[6]:""}</p>
                </div>
                <div className="admininsight-container-subpart">
                    <Progress type="dashboard" percent={((totalClicks/totalViews)*100)} gapDegree={150} strokeWidth={10} width={200} strokeColor={{ '0%': '#000AFF', '100%': '#E87A7A' }}/>
                    <h2>CTR</h2>
                    <h6>( Click Through Rate )</h6>
                </div>
                <div className="admininsight-container-subpart">
                <h5>TOTAL CLICKS</h5>
                    <p>{totalClicks}</p>
                    <h5>TODAY CLICKS</h5>
                    <p>{clicks?clicks[6]:""}</p>
                </div>
            </div>
            <div className="adminprofile-containers adminprofile-delete-account-container">
                    <h3>Views ( Last 7 Days )</h3>
                    <Line options={options1} data={data1} />
            </div>
            <div className="adminprofile-containers adminprofile-delete-account-container">
                    <h3>Clicks ( Last 7 Days )</h3>
                    <Line options={options2} data={data2} />
            </div>
        </Container>
    )
}
export default AdminInsight;