import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Report from "../report/Report.js";

class Typography extends React.Component {
  render() {
    return (
      <div className="content">
        <Row>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <h5 className="card-category">Most Recent Report </h5>
              </CardHeader>
              <CardBody>
                <Report />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Typography;
