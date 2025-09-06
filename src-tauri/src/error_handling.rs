// cf.(https://v2.tauri.app/develop/calling-rust/#error-handling)
use thiserror::Error;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error("Failed to connect to: {0}\nPlease check your password")]
    ConnectonErr(String),
    #[error("Failed to disconnect: {0}")]
    DisconnectionErr(String)
}

#[derive(serde::Serialize)]
#[serde(tag = "kind", content = "message")]
#[serde(rename_all = "camelCase")]
pub enum ErrorKind {
    Io(String),
    ConnectonErr(String),
    DisconnectionErr(String)
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where S: serde::ser::Serializer, {
        let error_message = self.to_string();
        let error_kind = match self {
            Self::Io(_) => ErrorKind::Io(error_message),
            Self::ConnectonErr(_) => ErrorKind::ConnectonErr(error_message),
            Self::DisconnectionErr(_) => ErrorKind::DisconnectionErr(error_message),
        };
        error_kind.serialize(serializer)
    }
}