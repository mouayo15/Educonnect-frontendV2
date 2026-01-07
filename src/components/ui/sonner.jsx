import { Toaster as SonnerToaster } from 'sonner';

const Toaster = (props) => {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      expand={true}
      visibleToasts={5}
      {...props}
    />
  );
};

export { Toaster };
