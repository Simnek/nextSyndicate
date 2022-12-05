const getEnvironmentVariable = (environmentVariable) => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  mailHost: getEnvironmentVariable("MAIL_HOST"),
  secret: getEnvironmentVariable("NEXTAUTH_SECRET"),
  dbLocal: getEnvironmentVariable("CONNECTION_STRING_LOCAL"),
  dbAtlas: getEnvironmentVariable("CONNECTION_STRING_ATLAS"),
  dbDocker: getEnvironmentVariable("CONNECTION_STRING_DOCKER"),
  localUrl: getEnvironmentVariable("NEXTAUTH_URL"),
  vercelUrl: getEnvironmentVariable("VERCEL_URL")
};
