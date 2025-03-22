import { Button } from "antd";
import React from "react";

interface IActionBtns {
  leftBtn: string;
  rightBtn?: string;
  hasBorder: boolean;
  hideRightBtn?: boolean;
  disableLeftBtn?: boolean;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

export default function ActionButtons({
  leftBtn,
  rightBtn,
  hasBorder,
  hideRightBtn = false,
  disableLeftBtn = false,
  onLeftClick,
  onRightClick,
}: IActionBtns) {
  return (
      <div className="fixed bottom-0 w-full mx-auto z-50 !bg-white border-t border-[#EBE1E1] pt-3 !mb-4">
        <div className="max-w-[390px] mx-auto flex justify-between w-full px-4 gap-3">
          {!hideRightBtn &&
            (hasBorder ? (
              <Button
                type="default"
                className="w-full !h-14"
                block
                onClick={onRightClick}
              >
                {rightBtn}
              </Button>
            ) : (
              <Button
                color="default"
                className="w-full !h-14"
                block
                onClick={onRightClick}
              >
                {rightBtn}
              </Button>
            ))}
          <Button
            type={hideRightBtn ? "primary" : "default"}
            disabled={disableLeftBtn}
            className="w-full !h-14"
            block
            onClick={onLeftClick}
          >
            {leftBtn}
          </Button>
        </div>
      </div>
  );
}
