import React from "react";

// reactstrap components
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap";
import Keywords from "../keywords/Keywords.js";
import Groups from "../groups/Groups.js";
class Icons extends React.Component {
  render() {
    return (
      <>
        <div className="content">
         <Row>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Threat Words</CardTitle>
                </CardHeader>
                <CardBody>
                <Keywords/>
                <Groups/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Icons;
