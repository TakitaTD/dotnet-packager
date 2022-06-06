const { execSync } = require("child_process");

function build() {
  RIDS.forEach((rid) => {
    const output = execSync(
      `dotnet publish -c Release --self-contained /p:PublishSingleFile=true /p:PublishReadyToRun=true -r ${rid}`,
      { encoding: "utf-8" }
    );

    console.log(`${rid} compilation completed.`);
  });
}
function pkg() {
  RIDS.forEach((rid) => {
    execSync(
      `sh -c "cd bin/Release/net6.0/${rid}/publish; zip ${rid}.zip . -r"`
    );
    File;
    console.log(`${rid} packaged.`);
  });
}

const RIDS = [
  "linux-arm",
  "linux-arm64",
  "linux-x64",
  "osx-arm64",
  "osx-x64",
  "win-arm",
  "win-arm64",
  "win-x64",
  "win-x86",
];
if (process.argv[2]) {
  if (process.argv[2] == "--build") build();
  if (process.argv[2] == "--package") pkg();
  if (process.argv[2] == "--both") {
    build();
    pkg();
  }
  switch (process.argv[2]) {
    case "--package":
      pkg();
      break;
    case "--build":
      build();
      break;
    case "--both":
      build();
      pkg();
      break;
    default:
      console.error("Usage: dotnet_packager --{command}");
      console.error("Possible commands: --build, --package, --both");
      console.error("--build: build for most operating systems.");
      console.error("--package: package all executables in zip format.");
      console.error("--both: does both, pretty self-explanatory");
  }
} else {
  console.error(
    "Please enter a valid command in this format: dotnet_packager --{command}"
  );
  console.error("Possible commands: --build, --package, --both");
}
