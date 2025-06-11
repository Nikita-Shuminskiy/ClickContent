interface Progress {
  step: number;
  steps: number;
  className?: string;
}

export const ProgressBar = ({ step, steps, className }: Progress) => {

  return (
    <div className={`${className ? className : ''} flex gap-1 w-full justify-center`}>
      {[...Array(steps)].map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: i < step ? '#874ab0' : '#222222',
          }}
          className='h-1 max-w-[32px] w-full rounded-full'
        />
      ))}
    </div>
  );
}
