import React, { useState } from "react";

/*
    --------------------------------------------------------
    작성자 : 김동규
    작성일 : 2024-12-13
    설명   : 주소 검색 및 상세주소 입력 관련 컴포넌트
    ---------------------------------------------------------
*/

export default function AddressSearch({ address, setAddress, detailedAddress, setDetailedAddress }) {
    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                const fullAddress = data.address;
                setAddress(fullAddress);
                setDetailedAddress("");
            },
        }).open();
    };

    return (
        <div>
            <label>회사 주소</label>
            <div className="address-container">
                <input
                    type="text"
                    value={address}
                    readOnly
                    placeholder="주소를 검색하세요"
                />
                <button type="button" onClick={openAddressSearch}>
                    검색
                </button>
            </div>
            {address && (
                <div className="detailed-address-container">
                    <input
                        type="text"
                        value={detailedAddress}
                        onChange={(e) => setDetailedAddress(e.target.value)}
                        placeholder="상세 주소를 입력하세요"
                    />
                </div>
            )}
        </div>
    );
}
