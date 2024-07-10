import * as React from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import classNames from 'classnames';
import type { InputNumberProps as RcInputNumberProps, ValueType } from 'rc-input-number';
import RcInputNumber from 'rc-input-number';

import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import ConfigProvider, { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import { FormItemInputContext, NoFormStyle } from '../form/context';
import type { Variant } from '../form/hooks/useVariants';
import useVariant from '../form/hooks/useVariants';
import { NoCompactStyle, useCompactItemContext } from '../space/Compact';
import useStyle from './style';

export interface InputNumberProps<T extends ValueType = ValueType>
  extends Omit<RcInputNumberProps<T>, 'prefix' | 'size' | 'controls'> {
  prefixCls?: string;
  rootClassName?: string;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  size?: SizeType;
  disabled?: boolean;
  /** @deprecated Use `variant` instead. */
  bordered?: boolean;
  status?: InputStatus;
  controls?: boolean | { upIcon?: React.ReactNode; downIcon?: React.ReactNode };
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>((props, ref) => {
  if (process.env.NODE_ENV !== 'production') {
    const { deprecated } = devUseWarning('InputNumber');
    deprecated(!('bordered' in props), 'bordered', 'variant');
  }

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => inputRef.current!);

  const {
    className,
    rootClassName,
    size: customizeSize,
    disabled: customDisabled,
    prefixCls: customizePrefixCls,
    addonBefore,
    addonAfter,
    prefix,
    bordered,
    readOnly,
    status: customStatus,
    controls,
    variant: customVariant,
    ...others
  } = props;

  const prefixCls = getPrefixCls('input-number', customizePrefixCls);

  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
  let upIcon = <UpOutlined className={`${prefixCls}-handler-up-inner`} />;
  let downIcon = <DownOutlined className={`${prefixCls}-handler-down-inner`} />;
  const controlsTemp = typeof controls === 'boolean' ? controls : undefined;

  if (typeof controls === 'object') {
    upIcon =
      typeof controls.upIcon === 'undefined' ? (
        upIcon
      ) : (
        <span className={`${prefixCls}-handler-up-inner`}>{controls.upIcon}</span>
      );
    downIcon =
      typeof controls.downIcon === 'undefined' ? (
        downIcon
      ) : (
        <span className={`${prefixCls}-handler-down-inner`}>{controls.downIcon}</span>
      );
  }

  const {
    hasFeedback,
    status: contextStatus,
    isFormItemInput,
    feedbackIcon,
  } = React.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  const [variant, enableVariantCls] = useVariant(customVariant, bordered);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  const suffixNode = hasFeedback && <>{feedbackIcon}</>;

  const inputNumberClass = classNames(
    {
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-in-form-item`]: isFormItemInput,
    },
    hashId,
  );
  const wrapperClassName = `${prefixCls}-group`;

  const element = (
    <RcInputNumber
      ref={inputRef}
      disabled={mergedDisabled}
      className={classNames(cssVarCls, rootCls, className, rootClassName, compactItemClassnames)}
      upHandler={upIcon}
      downHandler={downIcon}
      prefixCls={prefixCls}
      readOnly={readOnly}
      controls={controlsTemp}
      prefix={prefix}
      suffix={suffixNode}
      addonAfter={
        addonAfter && (
          <NoCompactStyle>
            <NoFormStyle override status>
              {addonAfter}
            </NoFormStyle>
          </NoCompactStyle>
        )
      }
      addonBefore={
        addonBefore && (
          <NoCompactStyle>
            <NoFormStyle override status>
              {addonBefore}
            </NoFormStyle>
          </NoCompactStyle>
        )
      }
      classNames={{
        input: inputNumberClass,
        variant: classNames(
          {
            [`${prefixCls}-${variant}`]: enableVariantCls,
          },

          getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
        ),
        affixWrapper: classNames(
          {
            [`${prefixCls}-affix-wrapper-sm`]: mergedSize === 'small',
            [`${prefixCls}-affix-wrapper-lg`]: mergedSize === 'large',
            [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
          },
          hashId,
        ),
        wrapper: classNames(
          {
            [`${wrapperClassName}-rtl`]: direction === 'rtl',
          },
          hashId,
        ),
        groupWrapper: classNames(
          {
            [`${prefixCls}-group-wrapper-sm`]: mergedSize === 'small',
            [`${prefixCls}-group-wrapper-lg`]: mergedSize === 'large',
            [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
            [`${prefixCls}-group-wrapper-${variant}`]: enableVariantCls,
          },
          getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback),
          hashId,
        ),
      }}
      {...others}
    />
  );

  return wrapCSSVar(element);
});

const TypedInputNumber = InputNumber as unknown as (<T extends ValueType = ValueType>(
  props: React.PropsWithChildren<InputNumberProps<T>> & React.RefAttributes<HTMLInputElement>,
) => React.ReactElement) & {
  displayName?: string;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PureInputNumber;
};

/** @private Internal Component. Do not use in your production. */
const PureInputNumber: React.FC<InputNumberProps> = (props) => (
  <ConfigProvider theme={{ components: { InputNumber: { handleVisible: true } } }}>
    <InputNumber {...props} />
  </ConfigProvider>
);

if (process.env.NODE_ENV !== 'production') {
  TypedInputNumber.displayName = 'InputNumber';
}

TypedInputNumber._InternalPanelDoNotUseOrYouWillBeFired = PureInputNumber;

export default TypedInputNumber;
