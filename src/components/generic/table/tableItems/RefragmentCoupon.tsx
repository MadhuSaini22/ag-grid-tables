import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { arrayAtomFamily } from "../../../../atoms";
import { useCoupons } from "../../../../hooks/use-Coupons";
import FormModal, { FormModalRefType } from "../../../core/modals/FormModal";
import PrimaryButton from "../../../core/PrimaryButton";
import FragmentForm from "../../FragmentForm";
import SelectDropdown from "../../SelectDropdown";

const RefragmentCoupon = forwardRef((props: any, ref) => {
  const [selectedValue, setSelectedValue] = useState(props.value);
  const fragments = useRecoilValue(arrayAtomFamily("allFragmentData"));

  const formModalRef = useRef<FormModalRefType>();
  const handleInputChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => selectedValue,
  }));

  return (
    <div className="example-header flex space-x-3">
      <SelectDropdown onChange={handleInputChange} label={""} options={fragments} id={"page-size"} />
      <PrimaryButton
        label={"Refragment"}
        onClick={() => {
          formModalRef.current?.show();
        }}
      />
      <FormModal ref={formModalRef}>
        <FragmentForm
          data={props.data}
          selectedId={selectedValue}
          onClose={() => {
            formModalRef.current?.hide();
          }}
        />
      </FormModal>
    </div>
  );
});

export default RefragmentCoupon;
