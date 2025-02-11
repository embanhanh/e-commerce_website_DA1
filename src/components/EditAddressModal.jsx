import { Form, Button, Modal, ListGroup } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import './EditAddressModal.scss'

function EditAddressModal({ show, handleClose, onEditAddress, address }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState(''); // State cho loại địa chỉ
    const [isDefault, setIsDefault] = useState(false);

    const [errors, setErrors] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        if (show && address) {
            setName(address.name);
            setPhone(address.phone);
            setLocation(address.location);
            setType(address.type);
            setIsDefault(address.default);
            setErrors({});
            setShowSuggestions(false);
            setSuggestions([]);
        }
    }, [show, address]);

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setLocation(value);
        setShowSuggestions(true);

        if (value) {
            // Fetch và lọc gợi ý địa chỉ dựa trên input
            setSuggestions([]); // Thay bằng gợi ý địa chỉ thực tế
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion);
        setShowSuggestions(false);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!name) {
            newErrors.name = 'Vui lòng nhập họ và tên';
        }
        if (!phone) {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        }
        if (!location) {
            newErrors.location = 'Vui lòng nhập địa chỉ';
        }
        if (!type) {
            newErrors.type = 'Vui lòng chọn loại địa chỉ'; // Kiểm tra loại địa chỉ
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const updatedAddressData = {
                    name,
                    phone,
                    location,
                    type,
                    default: isDefault,
                };
                await onEditAddress(updatedAddressData);
                handleClose(); // Đóng modal sau khi cập nhật thành công
            } catch (error) {
                setErrors({ submit: 'Có lỗi xảy ra khi cập nhật địa chỉ' });
                console.log(error);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className="fs-1">Chỉnh sửa địa chỉ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 fs-4">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Họ và tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3 fs-4">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && <p className="text-danger">{errors.phone}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3 fs-4">
                        <Form.Label>Địa chỉ</Form.Label>
                        <div className="input-form d-flex align-items-center w-100">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tỉnh/ Thành phố, Quận/ Huyện, Phường/ Xã"
                                value={location}
                                onChange={handleAddressChange}
                                onFocus={() => setShowSuggestions(true)}
                                ref={inputRef}
                            />
                        </div>
                        {showSuggestions && suggestions.length > 0 && (
                            <ListGroup className="suggestions-list" ref={suggestionsRef}>
                                {suggestions.map((suggestion, index) => (
                                    <ListGroup.Item
                                        key={index}
                                        action
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                        {errors.location && <p className="text-danger">{errors.location}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3 fs-4">
                        <Form.Label>Loại địa chỉ</Form.Label>
                        <Form.Control
                            as="select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Chọn loại địa chỉ</option>
                            <option value="home">Nhà riêng</option>
                            <option value="work">Cơ quan</option>
                        </Form.Control>
                        {errors.type && <p className="text-danger">{errors.type}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3 fs-4">
                        <div className="checkbox-cell">
                            <label className="d-flex align-items-center">
                                <input type="checkbox" className="input-checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
                                <span className="custom-checkbox" />
                                <span className="ms-2">Đặt làm địa chỉ mặc định.</span>
                            </label>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {errors.submit && <p className="text-danger">{errors.submit}</p>}
                <div className="d-flex flex-row  mb-3">
                    <Button className="btn btn-outline-danger mx-3" onClick={handleClose}>
                        Trở lại
                    </Button>
                    <Button className="btn btn-outline-success mx-3" style={{ minWidth: '130px' }} onClick={handleSubmit}>
                        Hoàn thành
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default EditAddressModal;
