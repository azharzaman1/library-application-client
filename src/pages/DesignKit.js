import { Google, Save, Send } from "@mui/icons-material";
import { Divider } from "@mui/material";
import Button from "../components/Generic/Button";
import Heading from "../components/Generic/Heading";
import Container from "../components/Generic/Layout/Container";

const DesignKit = () => {
  return (
    <div>
      <Container maxWidth="md" className="min-h-screen">
        <div className="mt-3 px-3 py-3 shadow-lg bg-white">
          <div className="header py-2 px-2 flex items-center justify-between rounded-md bg-secondary">
            <Heading type="secondary">DesignKit</Heading>
            <div>Switch</div>
          </div>
          <div className="kit-sections mt-5">
            <div className="kit-section">
              <Heading type="secondary">Buttons</Heading>
              <div className="mt-2">
                {/* Buttons */}
                <div className="rounded-md border px-3">
                  {/* Normal Buttons */}
                  <div>
                    <div className="mt-2">
                      <Heading type="tertiary">Normal</Heading>
                      <Divider />
                    </div>

                    <div className="py-5 flex items-center justify-between flex-wrap">
                      <Button>Primary Button</Button>
                      <Button type="secondary">Secondary Button</Button>

                      <Button type="icon" startIcon={<Save />}>
                        Icon Button
                      </Button>
                      <Button type="icon" endIcon={<Send />}>
                        Icon Button
                      </Button>
                      <Button type="special-icon">
                        <Google />
                      </Button>
                      <Button type="text">Text Button</Button>
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <Heading type="tertiary">Loading</Heading>
                      <Divider />
                    </div>

                    <div className="py-5 flex items-center space-x-3 flex-wrap">
                      <Button loading>Primary Button</Button>
                      <Button
                        type="icon"
                        loading
                        startIcon={<Save fontSize="small" />}
                      >
                        Icon Button
                      </Button>
                      <Button
                        type="icon"
                        loading
                        endIcon={<Send fontSize="small" />}
                      >
                        Icon Button
                      </Button>
                      <Button type="special-icon" loading>
                        <Google />
                      </Button>
                      <Button type="text" loading>
                        Text Button
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DesignKit;
