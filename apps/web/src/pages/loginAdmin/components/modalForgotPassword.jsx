import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";

export default function ({open, handleOpen}) {
    
    return (
        <>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                        Find Your Account
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Please enter your email address or mobile number to search for your account.
                        </Typography>
                        <Typography className="-mb-2" variant="h6">
                            Your Email
                        </Typography>
                        <Input label="Email" size="lg" />
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button style={{ backgroundColor: '#41907a' }} variant="filled" onClick={handleOpen} fullWidth>
                            Search
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    )
}