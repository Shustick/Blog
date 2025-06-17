type ArrowProps = {
  rotation: 'prev' | 'next';
  isDisabled: boolean;
};

export const Arrow = ({ rotation, isDisabled }: ArrowProps) => {
  return (
    <svg
      style={rotation === 'next' ? { transform: 'rotate(180deg)' } : {}}
      width="8"
      height="11"
      viewBox="0 0 8 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.49701 10.4959C6.36446 10.4959 6.23053 10.4521 6.1187 10.3646L0.267188 5.70386C0.124973 5.59039 0.0421295 5.41949 0.0421295 5.23765C0.0421295 5.05718 0.124973 4.88492 0.267188 4.77281L6.09384 0.136676C6.35342 -0.0697694 6.73312 -0.0287538 6.94161 0.228278C7.1501 0.485309 7.10867 0.861285 6.8491 1.06773L1.60787 5.23765L6.87533 9.43355C7.13491 9.64 7.17633 10.016 6.96784 10.273C6.84772 10.4193 6.67375 10.4959 6.49701 10.4959Z"
        fill="black"
        fillOpacity={isDisabled ? '0.35' : '0.75'}
      />
    </svg>
  );
};
