import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

const CardOrderSummary = () => {
  return (
    <>
      <Card className=" mt-[90px] w-[485px]">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className=" rounded-none border-b border-[#E4E4E4]"
        >
          <Typography variant="h3" className="mb-2 capitalize text-black ">
            order summary
          </Typography>
        </CardHeader>
        <CardBody></CardBody>
        <CardFooter className="mt-[159px]">
          <div className=" flex justify-end mb-6">
            <Typography className=" mr-3 text-lg text-[#313131] font-medium">
              Total
            </Typography>
            <Typography className="text-lg text-[#313131] font-medium">
              Rp 112.000
            </Typography>
          </div>
          <div className=" flex justify-center">
            <Button
              ripple={false}
              className=" bg-[#41907A] capitalize w-[375px] text-base"
            >
              place order
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardOrderSummary;
