class AppConfig {
    public readonly GeneralInformationEndpoint = 'https://fantasy.premierleague.com/api/bootstrap-static/';
    public readonly CORS_PROXY = "https://api.allorigins.win/get?url=";
}
export const appConfig = new AppConfig();