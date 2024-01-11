import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

const CardPaymentMethod = () => {
  return (
    <>
      <Card className=" mt-[53px] w-96">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className=" rounded-none border-b border-[background: rgba(0, 0, 0, 0.50);]"
        >
          <Typography variant="h3" color="black" className="mb-2 capitalize">
            payment method
          </Typography>
        </CardHeader>
        <CardBody>
          <Button ripple={false} className=" bg-[#41907A] capitalize text-sm">
            Add Shipping Address
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

export default CardPaymentMethod;
