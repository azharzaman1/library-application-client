import { Google, Save, Send } from "@mui/icons-material";
import { Divider, Grid, Stack } from "@mui/material";
import Button from "../components/Generic/Button";
import Chip from "../components/Generic/Chip";
import Heading from "../components/Generic/Heading";
import Container from "../components/Generic/Layout/Container";

const DesignKit = () => {
  return (
    <div>
      <Container maxWidth="md" className="min-h-screen">
        <div className="my-3 px-3 py-3 shadow-lg bg-white">
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

                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="space-evenly"
                      rowSpacing={2}
                      columnSpacing={2}
                      className="py-5"
                    >
                      <Grid item>
                        <Button>Primary Button</Button>
                      </Grid>
                      <Grid item>
                        <Button type="secondary">Secondary Button</Button>
                      </Grid>
                      <Grid item>
                        <Button type="icon" startIcon={<Save />}>
                          Icon Button
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button type="icon" endIcon={<Send />}>
                          Icon Button
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button type="special-icon">
                          <Google />
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button type="text">Text Button</Button>
                      </Grid>
                    </Grid>
                  </div>
                  <div>
                    <div className="mt-2">
                      <Heading type="tertiary">Loading</Heading>
                      <Divider />
                    </div>

                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="space-evenly"
                      rowSpacing={2}
                      columnSpacing={2}
                      className="py-5"
                    >
                      <Grid item>
                        <Button loading>Primary Button</Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="icon"
                          loading
                          startIcon={<Save fontSize="small" />}
                        >
                          Icon Button
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="icon"
                          loading
                          endIcon={<Send fontSize="small" />}
                        >
                          Icon Button
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button type="special-icon" loading>
                          <Google />
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button type="text" loading>
                          Text Button
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>

            <div className="kit-section">
              <Heading type="secondary">Chips</Heading>
              <div className="mt-2">
                {/* Chips */}
                <div className="rounded-md border px-3">
                  {/* Normal Chips */}
                  <div>
                    <div>
                      <div className="mt-2">
                        <Heading type="tertiary">Normal</Heading>
                        <Divider />
                      </div>

                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-evenly"
                        rowSpacing={2}
                        columnSpacing={2}
                        className="py-5"
                      >
                        <Grid item>
                          <Chip color="light">Default Chip Outlined</Chip>
                        </Grid>
                        <Grid item>
                          <Chip color="lightContained">
                            Light Chip Contained
                          </Chip>
                        </Grid>
                        <Grid item>
                          <Chip color="primary">Primary Chip Outlined</Chip>
                        </Grid>
                        <Grid item>
                          <Chip color="primaryContained">
                            Primary Chip Contained
                          </Chip>
                        </Grid>
                      </Grid>
                    </div>
                    <div>
                      <div className="mt-2">
                        <Heading type="tertiary">Icons</Heading>
                        <Divider />
                      </div>

                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="space-evenly"
                        rowSpacing={2}
                        columnSpacing={2}
                        className="py-5"
                      >
                        <Grid item>
                          <Chip
                            color="light"
                            startIcon={<Save fontSize="small" />}
                          >
                            Default Chip Outlined
                          </Chip>
                        </Grid>
                        <Grid item>
                          <Chip
                            color="lightContained"
                            endIcon={<Send fontSize="small" />}
                          >
                            Light Chip Contained
                          </Chip>
                        </Grid>

                        <Grid item>
                          <Chip
                            color="primary"
                            startIcon={<Save fontSize="small" />}
                          >
                            Primary Chip Outlined
                          </Chip>
                        </Grid>
                        <Grid item>
                          <Chip
                            color="primaryContained"
                            endIcon={<Send fontSize="small" />}
                          >
                            Primary Chip Contained
                          </Chip>
                        </Grid>
                      </Grid>
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
