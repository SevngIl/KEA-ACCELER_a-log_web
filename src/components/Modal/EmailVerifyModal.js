import React, { useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./EmailVerifyModal.css";
import { BsDot } from "react-icons/bs";

export const EmailVerifyModal = ({ show, handleClose, checkNumber, setCheckNumber, CheckEmailMessageHandler }) => {
    return (
        <Modal show={show} onHide={handleClose} className="EmailVerifyModal">
            <Modal.Header closeButton>
                <Modal.Title>인증번호</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="">
                        <Form.Label className="inputLabel">이메일로 인증번호 전송이 완료되었습니다!</Form.Label>
                        <Form.Control maxLength={6} type="text" placeholder="인증코드 입력" value={checkNumber} onChange={(e) => setCheckNumber(e.target.value)} />
                    </Form.Group>
                </Form>
                <div className="infoBox">
                    <p style={{ color: "rgb(230,59,71)", fontWeight: 600 }}>인증번호 문자를 못 받으셨나요?</p>
                    <div style={{ display: "flex" }}>
                        <BsDot />
                        <p className="infoText">
                            입력하신 인증정보가 일치하지 않을 경우, 인증번호 문자
                            <br />는 발송되지 않습니다.
                        </p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <BsDot />
                        <p className="infoText">
                            인증번호가 문자로 수신되지 않을 경우 정확한 정보로 재
                            <br /> 시도해 주시기 바랍니다.
                        </p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        handleClose();
                    }}
                >
                    취소
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        CheckEmailMessageHandler();
                    }}
                >
                    인증확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
