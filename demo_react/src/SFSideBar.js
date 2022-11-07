import * as React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import {Container} from "@mui/material";  

export default function SFResultDialog(props) {
  const { open, handleClose, data } = props;
  return (
    <Container maxWidth="xs">
      <Modal
        className="myModal"
        dialogClassName="modal-90w"
        show={open}
        onHide={handleClose}
      >
        <Modal.Header closeButton>Card Details</Modal.Header>
        <Modal.Body>
          {data[0]?.image && (
            <img
              className="d-block m-auto m-auto"
              src={`data:image/jpeg;base64,${data[0]?.image}`}
              width={200}
              height={200}
              alt={data[0]?.name}
            />
          )}
          <Container>
            {data[0]?.name && (
              <Row>
                <Col>Name</Col>
                <Col xs={2} className="text-center">
                  -
                </Col>
                <Col xs={6}>{data[0]?.name}</Col>
              </Row>
            )}
            {data[0]?.fatherName && (
              <Row>
                <Col>Father Name</Col>
                <Col xs={2} className="text-center">
                  -
                </Col>
                <Col xs={6}>{data[0]?.fatherName}</Col>
              </Row>
            )}
            {data[0]?.dob && (
              <Row>
                <Col>DOB</Col>
                <Col xs={2} className="text-center">
                  -
                </Col>
                <Col xs={6}>{data[0]?.dob}</Col>
              </Row>
            )}
            {data[0]?.sex && (
              <Row>
                <Col>Gender</Col>
                <Col xs={2} className="text-center">
                  -
                </Col>
                <Col xs={6}>{data[0]?.sex}</Col>
              </Row>
            )}
            {data[0]?.uniqueId && (
              <Row>
                <Col>ID Number</Col>
                <Col xs={2} className="text-center">
                  -
                </Col>
                <Col xs={6}>{data[0]?.uniqueId}</Col>
              </Row>
            )}
            {data[0]?.address && (
              <Row>
                <Col>Address</Col>
                <Col xs={2} className="text-center">
                  -
                </Col>
                <Col xs={6}>{data[0]?.address}</Col>
              </Row>
            )}
          </Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
