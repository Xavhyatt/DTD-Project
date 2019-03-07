import React from "react";
import Upload from "../upload/Uploads.jsx";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

// core components

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Upload Files</h5>
                </CardHeader>
                <CardBody>
                  <div>
                    <Upload />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
